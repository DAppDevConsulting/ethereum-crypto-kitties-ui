import Web3 from 'web3';
import _ from 'lodash';
import PromisesQueueWatcher from '../utils/PromisesQueueWatcher';
import Kitties from '../Kitties';
const Web3Config = require('../cfg').WEB3;
const httpProvider = new Web3(new Web3.providers.HttpProvider(Web3Config.http));
const SYNC_INTERVAL = 5000;
let currentContract = '';
let onNewBlockHandler = null;
let notificationCandidate = null;

let manager;

const queueWatcher = new PromisesQueueWatcher();

const handleEventsChain = async (events, handler) => {
    for (let event of events) {
        await handler(event);
    }
};

class ContractSynchronizer {
    constructor (contract, handlersMap, parallelizeEventsMethod) {
        this.contract = contract;
        this._handlersMap = handlersMap;
        this._parallelizeEvents = parallelizeEventsMethod;
    }

    async handlePastEvents (lastKnownBlock, actualBlock) {
        if (actualBlock <= lastKnownBlock) {
            return;
        }

        // events duplicates. We exclude first block.
        try {
            let events = await this.contract.getPastEvents(
                'allEvents',
                {fromBlock: lastKnownBlock + 1, toBlock: actualBlock}
            );
            await Promise.all(
                this._parallelizeEvents(events)
                    .map(arr => handleEventsChain(arr, (e) => this._handleEvent(e)))
            );
        } catch (error) {
            console.error(error);
        }
    }

    async _handleEvent (event) {
        if (this._handlersMap.has(event.event)) {
            await this._handlersMap.get(event.event)(event);
        }
    }
}

class SyncManager {
    constructor (contract) {
        this.contract = contract;
        this.synchronizer = this._createSynchronizer();
        this.lastKnownBlock = 0;
        this._timeout = 0;
        this._synchronizationRunning = false;
        this._watcher = null;
        this._map = new Map();
        this._lotsMap = new Map();
    }

    _createSynchronizer () {
        let map = new Map();
        map.set('_KittyCreated', (e) => this._onKittyCreated(e));
        map.set('_LotCreated', (e) => this._onLotCreated(e));
        map.set('_LotRemoved', (e) => this._onLotRemoved(e));
        return new ContractSynchronizer(
            this.contract,
            map,
            (events) => {
                let grouped = _.groupBy(events, 'returnValues._kittyId');
                return _.keys(grouped).map(k => grouped[k]);
            }
        );
    }

    setWatcher (watcher) {
        this._watcher = watcher;
    }

    _callWatcher () {
        if (typeof this._watcher === 'function') {
            this._watcher(...arguments);
        }
    }

    addKitty (id, owner) {
        this._map.set(id, {id, owner});
        this._callWatcher('add', id);
    }

    async synchronize () {
        if (this._synchronizationRunning) {
            return;
        }
        this._synchronizationRunning = true;
        await this._synchronizeAndUpdateActualBlock();
    }

    async _synchronizeAndUpdateActualBlock () {
        clearInterval(this._timeout);
        let actualBlock = await getActualBlock();
        await this.synchronizer.handlePastEvents(this.lastKnownBlock, actualBlock.number);
        this.lastKnownBlock = actualBlock.number;
        // TODO: вынести в более подходящее место
        if (typeof onNewBlockHandler === 'function') {
            onNewBlockHandler(actualBlock);
        }
        this._timeout = setTimeout(() => this._synchronizeAndUpdateActualBlock(), SYNC_INTERVAL);
    }

    clear () {
        this._map.clear();
        this._lotsMap.clear();
        this.lastKnownBlock = 0;
        clearTimeout(this._timeout);
        this._synchronizationRunning = false;
        this._watcher = null;
    }

    _onKittyCreated (event) {
        const id = event.returnValues._kittyId;
        const owner = event.returnValues._owner;
        this.addKitty(id, owner);
    }

    _onLotCreated (event) {
        const id = event.returnValues._kittyId;
        const owner = event.returnValues._owner;
        this._lotsMap.set(id, {id, owner});
        this._callWatcher('lotCreated', id);
    }

    _onLotRemoved (event) {
        const id = event.returnValues._kittyId;
        const owner = event.returnValues._owner;
        this._lotsMap.delete(id);
        this._callWatcher('lotRemoved', id);
    }

    isInitialized () {
        return this.lastKnownBlock > 0;
    }

    cats () {
        return [...this._map.values()];
    }

    catsFromMarket () {
        return [...this._lotsMap.values()];
    }

    async kittie (id) {
        const k = await this.contract.methods.kitties(id).call();
        return k;
    }

    synchronizationRunning () {
        return this._synchronizationRunning;
    }
}

const getActualBlock = async () => {
    try {
        let block = await httpProvider.eth.getBlock('latest');
        return block;
    } catch (err) {
        console.error(err);
    }
    return 0;
};

const isReady = () => {
    return manager && manager.isInitialized();
};

const prepareSynchronizer = async (address) => {
    if (!manager) {
        manager = new SyncManager(Kitties.contract('CryptoKitties', address, httpProvider));
    }
    console.time('sync');
    await manager.synchronize();
    console.timeEnd('sync');
    // TODO: hack
    setWatcher();
};

const setWatcher = () => {
    if (typeof notificationCandidate === 'function') {
        manager.setWatcher(notificationCandidate);
        notificationCandidate = null;
    }
};

const getPromiseFromQueue = (address) => {
    return new Promise((resolve, reject) => {
        queueWatcher.add(async () => {
            try {
                await prepareSynchronizer(address);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
};

const getCats = async (address) => {
    if (!isReady(address)) {
        await getPromiseFromQueue(address);
    }
    return manager.cats();
};

const getCatsFromMarket = async (address) => {
    if (!isReady(address)) {
        await getPromiseFromQueue(address);
    }
    return manager.catsFromMarket();
};

const setNotificationHandler = (handler) => {
    notificationCandidate = handler;
    if (currentContract && isReady(currentContract)) {
        setWatcher();
    }
};

const onNewBlock = (handler) => {
    onNewBlockHandler = handler;
};

const kittie = async (id) => {
    return manager.kittie(id);
};

export default {
    getCats,
    getCatsFromMarket,
    setNotificationHandler,
    kittie,
    onNewBlock
};

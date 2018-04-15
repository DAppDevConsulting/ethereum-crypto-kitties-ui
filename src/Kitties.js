let web3Provider = null;
let web3Contract = null;
let address = null;

const contract = (name, address, provider) => {
    let abi = require(`./contracts/${name}.json`).abi;

    if (!abi) {
        return null;
    }

    return new provider.eth.Contract(abi, address);
};

const stubAddress = () => {
    return '0x' + '0'.repeat(40);
};

const mount = (provider, contractAddress) => {
    address = contractAddress;
    web3Provider = provider;
    web3Contract = contract('CryptoKitties', contractAddress, provider);
};

const provider = () => {
    return web3Provider || {eth: {}};
};

const defaultAccountAddress = () => {
    return provider().eth.defaultAccount;
};

const getSender = (sendObj = {}) => {
    return sendObj.from || provider().eth.defaultAccount;
};

const send = (fn, ...args) => {
    // Detecting if last argument is a web3 send object
    let sendObject = (typeof args[args.length - 1] === 'object') ? args.pop() : {};

    sendObject.from = getSender(sendObject);

    return fn(...args).send(sendObject);
};

const contractAddr = () => address;

const getKitty = (id) => {
    return web3Contract.methods.kitties(id).call();
};

const getLot = (id) => {
    return web3Contract.methods.kittyIdToLot(id).call();
};

const mint = async (genes, name) => {
    await send(web3Contract.methods.mint, genes, name);
};

const sell = async (id, price) => {
    await send(web3Contract.methods.createLot, id, price);
};

const buy = async (id) => {
    await send(web3Contract.methods.bid, id);
};

const breed = async (mId, sId) => {
    await send(web3Contract.methods.breed, mId, sId);
};

export default {
    contract,
    mount,
    provider,
    defaultAccountAddress,
    send,
    contractAddr,
    getKitty,
    getLot,
    mint,
    sell,
    buy,
    breed
}

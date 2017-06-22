let mySocket = null;

function setSocket(_socket) {
    mySocket = _socket;
}

function getSocket() {
    return mySocket;
}

export {
    setSocket,
    getSocket
}
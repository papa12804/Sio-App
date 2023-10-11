const func = async () => {
    const response = await window.speed.cpufan()
    console.log(response)
    document.getElementById('cpu-fan-speed').innerHTML = response;
}

window.onload = function () {
    func()
}

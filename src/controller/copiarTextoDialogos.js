export default function copiarTextoDialogot(dados, id) {
    const spanCopy = document.querySelector('.span-copiado')
    spanCopy.classList.remove('none')

    const input = document.createElement('input');
    input.setAttribute('value', dados);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    const idres = document.getElementById(id)
    let spanCp = idres.querySelector('span')
    spanCp.classList.remove('none')

    setInterval(() => {
        spanCp.classList.add('none')
        spanCopy.classList.add('none')
    }, 3000)
}
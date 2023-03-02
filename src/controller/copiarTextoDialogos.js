export default function copiarTextoDialogot(dados, id) {
    const input = document.createElement('input');
    const idres = document.getElementById(id)

    input.setAttribute('value', dados);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    let spanCp = idres.querySelector('span')
    spanCp.classList.remove('none')

    setInterval(() => {
        spanCp.classList.add('none')
    }, 3000)
}
const fileinput = document.getElementById('fileinput');
const btna64 = document.getElementById('btna64');
const btnablob = document.getElementById('btnablob');

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result.split(',')[1]);
    })
}

btna64.addEventListener('click', async (e) => {
    console.log(btna64.innerText);
    console.log(`Conviertiendo mi blob`);
    const myBlob = fileinput.files[0];
    const myB64 = await blobToBase64(myBlob);
    console.log(myB64);

    btnablob.addEventListener('click', async (e) => {
        console.log(btnablob.innerText);
        const blob = await fetch(`data:audio/mpeg;base64,${myB64}`).then(res => res.blob());
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'audio.mp3';
        a.click();
    });
});
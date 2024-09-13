const BUTTON = document.querySelectorAll<HTMLButtonElement>('button');
const INPUTS = document.querySelectorAll<HTMLInputElement>('input');

// functions

// const SELECT_ELEMENET_HTML = (element: string) => document.querySelector<HTMLInputElement>(element)!.value;

function generate_data(ev: MouseEvent): void {
    ev.preventDefault();

    if (document.querySelector('.binary-svg')) 
        remove_binary_rain();

    // let fileType = parseInt(SELECT_ELEMENET_HTML('.file-type'));
    let fileType = parseInt(document.querySelector<HTMLInputElement>('.file-type')!.value);
    let fileSize = parseInt(document.querySelector<HTMLInputElement>('.file-size')!.value);
    
    if (validade_data(fileType ,fileSize)) return;
    
    set_type_of_file(fileType, fileSize);
    display_msg(fileSize, fileType);

    clean_input();
}

function validade_data(inputDataType: number, inputDataSize: number): boolean {
    if (isNaN(inputDataType) || isNaN(inputDataSize)) {
        alert("not allowed , a # -5");
        return true;
    }
    
    if (!Number.isInteger(inputDataSize) || !Number.isInteger(inputDataType)) {
        alert("only interger number pls!");
        return true;
    }
    
    if (inputDataType < 1 || inputDataType > 5) {
        document.querySelector<HTMLInputElement>('.file-type')!.value = '';
        alert("select a number between 1 - 5!");
        return true;
    }

    if (inputDataSize < 1 || inputDataSize > 1024) {
        document.querySelector<HTMLInputElement>('.file-size')!.value = '';
        alert("select a number between 1 - 1024!");
        return true;
    }

    return false;
}

function clean_input(): void {
    document.querySelector<HTMLInputElement>('.file-type')!.value = '';
    document.querySelector<HTMLInputElement>('.file-size')!.value = '';
}

function binary_rain() {
    let svg = '';

    for (let i=1; i<=12; i++) {
        svg = `
            <svg class="icon binary-svg">
                <use xlink:href="public/binary.svg#number-${i % 2 == 0 ? 0 : 1}"></use>
            </svg>`;
        
        // insertAdjacentHTML or innerHTML whats the difference?
        document.body.insertAdjacentHTML('beforebegin', svg);
        svg = '';
    }

    document.querySelector<HTMLOutputElement>('.output')!.innerHTML = `
        <div class='container-binary-output'>
            <p>Para representar um dado em um sistema computacional, geralmente é necessário pelo menos 1 byte (8 bits). Isso acontece porque a maioria dos sistemas computacionais atuais trabalha com uma unidade mínima de armazenamento que é o byte.</p>

            <h2>1 Byte = 8 Bits:</h2> 
            <p>Um byte é composto por 8 bits. Cada bit pode ter o valor 0 ou 1, então um byte pode representar 256 valores diferentes (2^8), que vão de 0 a 255.</p>
            
            <h2>Representação de Dados:</h2> 
            <p>Mesmo para representar o menor dado possível (como um caractere ou um número pequeno), normalmente é utilizado pelo menos 1 byte. Por exemplo, na codificação ASCII, cada caractere é representado por 1 byte.</p>
        </div>`;
}

function remove_binary_rain() {
    document.querySelectorAll('.binary-svg').forEach(el => el.remove());
}

function set_type_of_file(file_type: number, quantity_type: number): void {
    switch (file_type) {
        case 1: binary_rain(); break;
        case 2: create_string_with_size(quantity_type -1, '#'); break;
        case 3: create_string_with_size(quantity_type -1, '#'.repeat(1024)); break;
        case 4: create_string_with_size(quantity_type -1, '#'.repeat(1024).repeat(1024)); break; 
        case 5: warning();
            break;
    }
}

function display_msg(file_size: number, type_of_data: number): void {
    const STORAGE_UNITS: { [key in 1 | 2 | 3 | 4 | 5]: string } = {     
        1: 'bit',
        2: 'byte',
        3: 'Kilobyte',
        4: 'Megabyte',
        5: 'Gigabyte'
    };

    document.querySelector<HTMLParagraphElement>('.display-type-and-size')!.textContent = `${file_size}`
    // `${STORAGE_UNITS.[`${type_of_data}`]}, ${file_size}`;
}

function create_string_with_size(quantity_type: number, textV: string): void {
    let text = '';
    for (let i=0; i<=quantity_type; i++) {
        text += textV;
    }


    document.querySelector<HTMLOutputElement>('.output')!.innerText = text;
}

function clean_output(ev: MouseEvent) {
    ev.preventDefault();

    if (document.querySelector('.binary-svg')) 
        remove_binary_rain();

    document.querySelector<HTMLOutputElement>('.output')!.innerText = '';
}

function copy_output() {
    let textToCopy = document.querySelector<HTMLOutputElement>('.output')!.value;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => { console.log('Texto copiado com sucesso!'); })
        .catch(err => { console.error('Erro ao copiar o texto: ', err)});
}

function warning() {
    alert("opt [5: Gigabyte] doesn't work, but if you want to program this part, go for it!");
}

// Event 
BUTTON.forEach(btn => {
    btn.addEventListener('click', (ev) => {
        ev.preventDefault();

        if (btn.name === 'process') generate_data(ev);
        if (btn.name === 'clean') clean_output(ev);
        if (btn.name === 'copy') copy_output();
    })
})

INPUTS.forEach(input => { input.addEventListener('input', () => remove_binary_rain())});
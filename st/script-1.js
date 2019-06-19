const pickrContainer = document.querySelector('.pickr-container');
const themeContainer = document.querySelector('.theme-container');
const themes = [
    [
        'monolith',
        {
            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 0.95)',
                'rgba(156, 39, 176, 0.9)',
                'rgba(103, 58, 183, 0.85)',
                'rgba(63, 81, 181, 0.8)',
                'rgba(33, 150, 243, 0.75)',
                'rgba(3, 169, 244, 0.7)'
            ],

            defaultRepresentation: 'HEXA',
            components: {
                preview: true,
                opacity: true,
                hue: true,

                interaction: {
                    hex: false,
                    rgba: false,
                    hsva: false,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        }
    ]
];

const buttons = [];
let pickrInstance = null;

const defaultColorEl = document.getElementById('defaultColor')
const defaultColor = defaultColorEl.getAttribute('data-value')

for (const [theme, config] of themes) {
    const button = document.createElement('button');
    button.innerHTML = theme;
    buttons.push(button);

    button.addEventListener('click', () => {
        const el = document.createElement('p');
        pickrContainer.appendChild(el);

        // Delete previous instance
        if (pickrInstance) {
            pickrInstance.destroyAndRemove();
        }

        // Apply active class
        for (const btn of buttons) {
            btn.classList[btn === button ? 'add' : 'remove']('active');
        }

        // Create fresh instance
        pickrInstance = new Pickr(Object.assign({
            el, theme,
            //default: '#42445A'
            default: defaultColor
        }, config));

        pickrInstance.on('save', (...args) => {
            console.log('save', args);

            // only execute if have value
            if(args[0])
                console.log('save', args[0].toHEXA().toString());
            
        });
    });

    themeContainer.appendChild(button);
}

buttons[0].click();

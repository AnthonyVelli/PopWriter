var mediumEditorOptions = {
    toolbar: {
        buttons: [
            {
                name: 'h1',
                action: 'append-h2',
                aria: 'header type 1',
                tagNames: ['h2'],
                contentDefault: '<b>Header</b>',
                classList: ['custom-class-h1'],
                attrs: {
                    'data-custom-attr': 'attr-value-h1'
                }
            },
            {
                name: 'h2',
                action: 'append-h3',
                aria: 'header type 2',
                tagNames: ['h3'],
                contentDefault: '<b>H2</b>',
                classList: ['custom-class-h2'],
                attrs: {
                    'data-custom-attr': 'attr-value-h2'
                }
            },
            'justifyCenter',
            'quote',
            'anchor'
        ]
    }
}

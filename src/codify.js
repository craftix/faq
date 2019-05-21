export default function(area, event, onUpdate) {
    const a = area.selectionStart;
    const b = area.selectionEnd;
    const val = area.value;

    const set = val => {
        area.value = val;
        onUpdate(val);
    };

    const double = chars => {
        event.preventDefault();

        set(val.substring(0, a)
            + chars
            + val.substring(b));

        area.selectionEnd = a + 1;
    };

    if (a !== b) {
        if (event.key === 'Tab') {
            event.preventDefault();

            let start;
            for (start = a; start > 0 && val[start] !== '\n'; start--);

            if (start !== 0) {
                start++;
            }

            let firstShift = 0;
            let updated = val.substring(start, b)
                .split('\n')
                .map(!event.shiftKey ? (l => '    ' + l) : ((l, index) => {
                    for (let i = 0; i < 4 && l.length > 0 && l[0] === ' '; i++) {
                        l = l.substring(1);

                        if (index === 0) {
                            firstShift++;
                        }
                    }

                    return l;
                }))
                .join('\n');

            set(val.substring(0, start)
                + updated
                + val.substring(b));

            area.selectionStart = event.shiftKey ? a - firstShift : a + 4;
            area.selectionEnd = start + updated.length;
        }

        return;
    }

    let spaces = 0;
    let lastLinePos = 0;
    for (const c in val) {
        if (val[c] === '\n' && c < a) {
            lastLinePos = parseInt(c) + 1; /// ??
        }
    }

    switch(event.key) {
        case 'Enter':
            event.preventDefault();

            for (let i = lastLinePos; i < b; i++) {
                if (val[i] === ' ') {
                    spaces++;
                } else {
                    break;
                }
            }

            spaces = Math.floor(spaces / 4);

            if (a > 0 && val[a - 1] === '{' && val[a] === '}') {
                const shift = '\n' + '    '.repeat(spaces + 1) + '\n';

                set(area.value = val.substring(0, a)
                    + shift + '    '.repeat(spaces)
                    + val.substring(b));

                area.selectionEnd = a + shift.length -1;
                break;
                //spaces++;
            }

            set(val.substring(0, a)
                + '\n'
                + '    '.repeat(spaces)
                + val.substring(b));

            area.selectionEnd = a + spaces * 4 + 1;

            break;
        case 'Tab':
            event.preventDefault();
            const shift = ' '.repeat(4 - ((a - lastLinePos) % 4));

            set(val.substring(0, a)
                + shift
                + val.substring(b));

            area.selectionEnd = a + shift.length;

            break;
        case 'Backspace':
            event.preventDefault();

            for (let i = a - 1; i >= 0; i--) {
                if (val[i] === ' ' && spaces < 4) {
                    spaces++;
                } else {
                    break;
                }
            }

            const newPos = a - (spaces >= 4 ? 4 : 1);
            set(val.substring(0, newPos) + val.substring(b));

            area.selectionEnd = newPos;

            break;
        case '{':
            double('{}');
            break;
        case '(':
            double('()');
            break;
        case '"':
            double('""');
            break;
        case "'":
            double("''");
            break;
        case "*":
            double("**");
            break;
        case "[":
            double("[]");
            break;
    }
}

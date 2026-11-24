function fail(message) {
    throw new Error(message);
}
const lines = text => text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
export function transform(s) {
    if (!s.trim()) fail('Enter some source text.');
    const v = lines(s);
    if (v.length < 2 || new Set(v).size !== v.length || v.length > 100) fail('Enter 2–100 unique teams');
    if (v.length % 2) v.push(null);
    const out = [];
    for (let r = 0; r < v.length - 1; r++) {
        out.push('Round ' + (r + 1));
        for (let i = 0; i < v.length / 2; i++) {
            const a = v[i],
                b = v[v.length - 1 - i];
            out.push(a && b ? a + ' vs ' + b : (a || b) + ' · bye')
        }
        v.splice(1, 0, v.pop());
        out.push('')
    }
    return out.join('\n')
}

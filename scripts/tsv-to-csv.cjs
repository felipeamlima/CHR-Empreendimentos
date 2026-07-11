/* eslint-disable */
// Converts properties-seed.tsv to properties-seed.csv with proper quoting.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'properties-seed.tsv');
const OUT = path.join(__dirname, 'properties-seed.csv');

const tsv = fs.readFileSync(SRC, 'utf8');
const rows = tsv.split('\n').map((line) => line.split('\t'));

const csv = rows
    .map((row) =>
        row
            .map((cell) => {
                const c = String(cell ?? '');
                // CSV quote if contains comma, quote, or newline
                if (/[",\r\n]/.test(c)) {
                    return '"' + c.replace(/"/g, '""') + '"';
                }
                return c;
            })
            .join(','),
    )
    .join('\n');

// Add UTF-8 BOM so Excel/PT-BR Sheets recognise accented characters properly
fs.writeFileSync(OUT, '﻿' + csv, 'utf8');
console.log(`Wrote ${OUT}`);

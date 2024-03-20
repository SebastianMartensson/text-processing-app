import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export async function fileHandler(req: Request, res: Response, next: NextFunction) {
    try {
        throw new Error("oopsie");
        const fileContent = fs.readFileSync(req.file!.path, 'utf-8');
        const mostUsedWord = findMostUsedWord(fileContent);
        const processedText = fileContent.replace(new RegExp(mostUsedWord, 'g'), `foo${mostUsedWord}bar`);

        res.status(200).json({ processedText });
    } catch (error) {
        next(error);
    }
}

function findMostUsedWord(text: string): string {
    const words = text.split(/\s+/); 
    const wordCounts = new Map<string, number>();

    words.forEach(word => {
        const count = wordCounts.get(word) || 0;
        wordCounts.set(word, count + 1);
    });

    let mostUsedWord = '';
    let maxCount = 0;
    for (const [word, count] of wordCounts.entries()) {
        if (count > maxCount) {
            mostUsedWord = word;
            maxCount = count;
        }
    }

    return mostUsedWord;
}


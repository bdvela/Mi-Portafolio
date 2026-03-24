/**
 * Translation Service
 * Uses a free/unofficial Google Translate API endpoint for simple portfolio needs.
 */
export class TranslationService {
    static async translate(text: string, from: string = 'es', to: string = 'en'): Promise<string> {
        if (!text || text.trim() === "") return "";
        
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Translation API error: ${response.statusText}`);
            }

            const data = await response.json();
            
            // The API returns nested arrays: [[["Translated text", "Source text", null, null, 3], ...], ...]
            if (data && data[0]) {
                return data[0].map((item: any) => item[0]).join("");
            }
            
            return text;
        } catch (error) {
            console.error("Translation Service Error:", error);
            return text; // Fallback to original text if translation fails
        }
    }

    /**
     * Translates an entire object of strings
     */
    static async translateObject<T extends Record<string, any>>(obj: T, fields: (keyof T)[]): Promise<T> {
        const translated = { ...obj };
        for (const field of fields) {
            if (typeof obj[field] === 'string') {
                translated[field] = await this.translate(obj[field] as string) as any;
            }
        }
        return translated;
    }
}

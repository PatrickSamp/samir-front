export function validateRequiredFields(obj, requiredFields) {
    return new Promise((resolve, reject) => {
        if (!obj) {
            reject(new Error("object is null"));
        }

        for (let field of requiredFields) {
            if (!(field in obj)) {
                reject(new Error(`field ${field} does not exist`));
            } else {
                // Verificar se o campo é vazio ou nulo
                let value = obj[field];
                if (value == null || value === "") {
                    reject(new Error(`field ${field} cannot be empty or null`));
                }
            }
        }  
        resolve(null);
    })
}
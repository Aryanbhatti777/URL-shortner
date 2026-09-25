

export const generateCode = () => {

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shortCode = ""

    for (let i = 0; i < 6; i++){
        shortCode += chars.charAt(Math.ceil(Math.random()*62))
    }

    return shortCode
}
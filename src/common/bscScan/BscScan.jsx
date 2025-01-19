
export const openBscPage = () => {
    const baseUrl = 'https://testnet.bscscan.com/';
    const transactionHash = '0x71673d39d714d71c4fc6fb8698793bcda62d4512bd6138cfc4ac1b0bcd33e6f0';
    const url = `${baseUrl}tx/${transactionHash}`;
    window.open(url, '_blank');
};
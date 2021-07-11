export default {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    API_URL: process.env.NEXT_PUBLIC_URL_API ?? 'http://localhost:8484/api', 
    API_KEYS_MAPS: process.env.NEXT_PUBLIC_KEY_MAPS ?? 'AIzaSyAvgLJRdxhHzB5Sf1mdQrQNqkBw-n1RISo',
    SORT_NAME_DESC: 'NAME_DESC',
    SORT_NAME_ASC: 'NAME_ASC',
    SORT_AMOUT_DESC: 'AMOUT_DESC',
    SORT_AMOUT_ASC: 'AMOUT_ASC',
}
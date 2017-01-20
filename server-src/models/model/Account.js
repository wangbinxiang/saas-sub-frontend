export default class Account {
    constructor({
        id = 0,
        balance = '',
        blocked = '',
        source = ''
    }) {
        this.id = id;
        this.balance = balance;
        this.blocked = blocked;
        this.source = source;
    }
}
interface IStats {
    count?: number;
    win?: number;
    averageTime?: number;
}

export default class Stats {
    _stats: IStats;
    _id: string;

    static DEFAULT_STATS = {
        count: 0,
        win: 0,
        averageTime: 0
    };

    constructor(id: string, stats?: IStats) {
        this._id = id;

        if (stats) {
            this._stats = stats;
        } else {
            this._stats = this.readFromLocalStorage();
        }
    }

    getStats() {
        return {...this._stats};
    }

    save(stats: IStats = this._stats) {
        this._stats = {
            ...this._stats,
            ...stats
        };

        localStorage.setItem(this._id, JSON.stringify(this._stats));
    }

    addGame(count: number = 1) {
        this._stats.count += count;

        this.save();
    }

    addWin(winTime: number) {
        const {win, averageTime} = this._stats;

        this._stats.win = win + 1;
        this._stats.averageTime = (averageTime * win + winTime) / this._stats.win;

        this.save();
    }

    readFromLocalStorage(): IStats {
        const stats: string | null = localStorage.getItem(this._id);

        try {
            const statsData: IStats = JSON.parse(stats);

            return {...Stats.DEFAULT_STATS, ...statsData};
        } catch(ex) {
            console.log(ex);

            return {...Stats.DEFAULT_STATS};
        }
    }
}

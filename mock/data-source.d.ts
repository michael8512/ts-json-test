
declare namespace DATA_SOURCE {
  interface Detail {
    name: string;
    id: number;
    description: string;
    host: string;
    category: string;
    source: string;
    labels: ILabel[];
    type: string;
    syncTables: string[];
  }
}



declare namespace DATA_SOURCE {
  interface DS {
    id: number;
    name: string;
    category: string;
    description?: string;
    type: string;
    host: string;
    port: string;
    db: string;
    user: string;
    pass: string;
    labels: Array<{ id: number; name: string }>;
    fileSourceId: number;
  }

  interface GetDsQuery {
    query?: string;
    category?: string;
    labelId?: string[];
    updatedFrom?: string;
    updatedTo?: string;
    type?: string;
  }

  type DsTouchDataType = 'Success' | 'DbChange' | 'Fail';

  interface GetDsTouch {
    db: string;
    host: string;
    name: string;
    pass: string;
    port: string;
    sourceType: string;
    user: string;
  }

  interface DsTouchData {
    modelName: string;
    selected: boolean;
  }

  interface Detail {
    name: string;
    id: number;
    description: string;
    host: string;
    category: string;
    source: string;
    // labels: ILabel[];
    type: string;
    syncTables: string[];
  }
}


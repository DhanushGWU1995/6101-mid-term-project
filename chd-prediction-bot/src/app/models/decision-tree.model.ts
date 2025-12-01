export interface DecisionTreeNode {
    condition: string;
    outcome: string;
    probability?: { yes: number; no: number };
    n?: number;
    terminal?: boolean;
    children?: DecisionTreeNode[];
}

export interface DecisionTree {
    children: DecisionTreeNode[];
}

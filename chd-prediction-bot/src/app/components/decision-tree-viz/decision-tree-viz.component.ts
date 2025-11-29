import { Component } from '@angular/core';
import { DecisionTreeNode } from '../../models/decision-tree.model';
import { decisionTreeRules } from '../../data/decision-tree-rules';

@Component({
  selector: 'app-decision-tree-viz',
  templateUrl: './decision-tree-viz.component.html',
  styleUrls: ['./decision-tree-viz.component.scss']
})
export class DecisionTreeVizComponent {
  treeRules: DecisionTreeNode[];

  constructor() {
    this.treeRules = decisionTreeRules.rules;
  }
}

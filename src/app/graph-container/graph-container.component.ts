import { Component, OnInit } from '@angular/core';
import { Link, Node } from '../d3';
import { DGraphService } from '../dgraph.service';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.css']
})
export class GraphContainerComponent implements OnInit {

  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private dGraphService: DGraphService) {
    const dGraphResponse = dGraphService.getContent();

    dGraphResponse.data.expand.forEach(node => {
      this.nodes.push(new Node(node._uid_, node.name));
    });


    dGraphResponse.data.expand.forEach(node => {
      if (node['connected']) {
        node['connected'].forEach(connectedNode => {
          this.links.push(new Link(node._uid_, connectedNode._uid_, 5))
        });
      }
    });
  }

  ngOnInit() {
  }

}

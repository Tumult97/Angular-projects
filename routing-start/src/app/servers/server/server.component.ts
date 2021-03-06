import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  paramsSub: Subscription;

  constructor(private serversService: ServersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    // this.paramsSub = this.route.params.subscribe(
    //   (params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
    // this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
  }

  onAdded(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}

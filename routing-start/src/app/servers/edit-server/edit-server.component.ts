import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  //#region [subscriptions]
    paramsSub: Subscription;
    queryParamsSub: Subscription;
    fragmentSub: Subscription;
  //#endregion

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.queryParamsSub = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        console.log(queryParams['allowEdit']);
      }
    );
    this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === '1' ? true : false;

    this.paramsSub = this.route.params.subscribe(
      (params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  //#region [subscriptions]
    paramsSub: Subscription;
    queryParamsSub: Subscription;
    fragmentSub: Subscription;
  //#endregion

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

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
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }
    else if(this.serverName !== this.server.name || this.serverStatus !== this.server.status && !this.changesSaved) {
      return confirm('Do you want to discard changes made?');
    }
    else{
      return true;
    }
  }
}

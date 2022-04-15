import {LoggingService} from './logging.service';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AccountsService {
  constructor(private loggingService: LoggingService) {}

  private accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdatedEvent: EventEmitter<string> = new EventEmitter<string>();

  getAccounts() {
    return this.accounts;
  }

  addAccount(accountName: string, accountStatus: string) {
    this.accounts.push({name: accountName, status: accountStatus});
    this.loggingService.logStatusChange(accountStatus);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}

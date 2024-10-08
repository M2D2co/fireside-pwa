import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Chat } from '../chat.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  readonly searchForm: UntypedFormGroup;
  searching = false;

  chats: Observable<Chat[]> = EMPTY;

  constructor(
    private fb: UntypedFormBuilder,
    private chatService: ChatService,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  search() {
    const search = this.searchForm.get('search')?.value;

    if (!search) {
      return;
    }
    this.searching = true;

    this.chats = this.chatService.search(search).pipe(tap(() => this.searching = false));
  }

}

import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

export const EXECUTE_SEARCH = 'Execute Search';

export class ExecuteSearch implements Action {
  type = EXECUTE_SEARCH;
  constructor() {}
}

export type Actions = ExecuteSearch;

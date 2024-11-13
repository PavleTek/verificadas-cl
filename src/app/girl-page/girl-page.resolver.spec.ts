import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { girlPageResolver } from './girl-page.resolver';

describe('girlPageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => girlPageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

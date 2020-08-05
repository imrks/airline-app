import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { User } from '../../model/user.model';

describe('HeaderComponent', () => {
  const subjectMock =new BehaviorSubject<User>(null);
  const mockSubService = {      
  mockuserSub: subjectMock.asObservable()
};

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        providers: [{ provide: AuthService, useValue: mockSubService }],
      }).compileComponents();
    }),
  );

  it('Check the header authentication state', () => {
    const value:boolean = false;
    subjectMock
    .subscribe(res => {
      expect(!!res).toEqual(value)
    });
  });
});
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  call getBooks', inject([BooksService], (booksService: BooksService) => {
    const httpSpy = spyOn(booksService, 'getBooks').and.stub();
    service.getBooks('java');
    expect(httpSpy).toHaveBeenCalledTimes(1);
  }));
});

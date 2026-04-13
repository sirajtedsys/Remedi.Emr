/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcedureBookingService } from './procedure-booking.service';

describe('Service: ProcedureBooking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcedureBookingService]
    });
  });

  it('should ...', inject([ProcedureBookingService], (service: ProcedureBookingService) => {
    expect(service).toBeTruthy();
  }));
});

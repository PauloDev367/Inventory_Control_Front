import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = window.localStorage.getItem('token');

  if(token){
    return true;
  }
  router.navigate(['/']);
  return false;  
};

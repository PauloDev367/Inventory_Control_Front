import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = window.localStorage.getItem('token');

  if(token){
    return true;
  }

  toastr.error('É preciso fazer login para acessar essa rota');
  router.navigate(['/']);
  return false;  
};

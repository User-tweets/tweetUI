import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem('token');
  console.log('token '+token)
  let router = inject(Router);
  if(token){
    return true;
  }else{
    router.navigate(['/']);
    return false;
  }
};

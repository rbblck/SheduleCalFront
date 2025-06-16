import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main-components/home/home.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'calculator',
    component: CalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgIf],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('visor', { static: true }) visorCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cord', { static: true }) cordCanvas!: ElementRef<HTMLCanvasElement>;

  private y1 = 160;
  private y2 = 100;
  private y3 = 100;

  private y1Forward = true;
  private y2Forward = false;
  private y3Forward = true;
  public userIsLogged: boolean = false;

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    document.querySelector("body")?.classList.add('not-found-body');
    document.querySelector("html")?.classList.add('not-found-body');
    if (window.localStorage.getItem('token') != null) {
      this.userIsLogged = true;
    }
  }

  ngOnDestroy(): void {
    document.querySelector("body")?.classList.remove('not-found-body');
    document.querySelector("html")?.classList.remove('not-found-body');
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngAfterViewInit(): void {
    this.drawVisor();
    this.animate();
  }

  drawVisor(): void {
    const canvas = this.visorCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(5, 45);
    ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
    ctx.lineTo(55, 20);
    ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
    ctx.lineTo(15, 10);
    ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
    ctx.lineTo(5, 45);

    ctx.fillStyle = '#2f3640';
    ctx.strokeStyle = '#f5f6fa';
    ctx.fill();
    ctx.stroke();
  }

  animate = (): void => {
    const canvas = this.cordCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    requestAnimationFrame(this.animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(130, 170);
    ctx.bezierCurveTo(250, this.y1, 345, this.y2, 400, this.y3);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Atualização dos pontos de controle
    this.y1Forward = this.y1 === 100 ? true : this.y1 === 300 ? false : this.y1Forward;
    this.y2Forward = this.y2 === 100 ? true : this.y2 === 310 ? false : this.y2Forward;
    this.y3Forward = this.y3 === 100 ? true : this.y3 === 317 ? false : this.y3Forward;

    this.y1 += this.y1Forward ? 1 : -1;
    this.y2 += this.y2Forward ? 1 : -1;
    this.y3 += this.y3Forward ? 1 : -1;
  }

}

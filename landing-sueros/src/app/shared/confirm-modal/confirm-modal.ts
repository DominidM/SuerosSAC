import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="modal-backdrop" (click)="cancelar.emit()">
        <div class="modal-card" (click)="$event.stopPropagation()">
          <div class="modal-icon" [class]="tipo()">
            @if (tipo() === 'danger') {
              <i class="pi pi-exclamation-triangle"></i>
            } @else if (tipo() === 'success') {
              <i class="pi pi-check-circle"></i>
            } @else {
              <i class="pi pi-info-circle"></i>
            }
          </div>

          <h3 class="modal-title">{{ titulo() }}</h3>
          <p class="modal-message">{{ mensaje() }}</p>

          <div class="modal-actions">
            @if (tipo() !== 'success') {
              <button class="btn-cancel" (click)="cancelar.emit()">
                {{ textoCancelar() }}
              </button>
            }
            <button class="btn-confirm" [class]="tipo()" (click)="confirmar.emit()">
              {{ tipo() === 'success' ? 'Cerrar' : textoConfirmar() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9998;
      padding: 1rem;
    }

    .modal-card {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem;
      padding: 2rem;
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .modal-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.25rem;
      font-size: 1.5rem;

      &.danger { background: rgba(239, 68, 68, 0.15); color: #f87171; }
      &.success { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
      &.info { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    }

    .modal-title {
      color: #fff;
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }

    .modal-message {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9375rem;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }

    .modal-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }

    .btn-cancel {
      padding: 0.625rem 1.25rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 0.625rem;
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.06);
        color: #fff;
      }
    }

    .btn-confirm {
      padding: 0.625rem 1.5rem;
      border: none;
      border-radius: 0.625rem;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover { opacity: 0.9; }

      &.danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; }
      &.success { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; }
      &.info { background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff; }
    }
  `
})
export class ConfirmModalComponent {
  visible = input(false);
  titulo = input('¿Estás seguro?');
  mensaje = input('');
  tipo = input<'danger' | 'success' | 'info'>('danger');
  textoConfirmar = input('Eliminar');
  textoCancelar = input('Cancelar');

  confirmar = output<void>();
  cancelar = output<void>();
}

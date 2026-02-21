import BG from '@/shared/assets/images/homes/computer.png';
import { Button, Container } from '@/shared/ui';

const Poster = () => (
  <section className="bg-[rgb(var(--color-bg))] py-12">
    <Container maxWidth="2xl">
      <div className="text-center">
        <p className="text-sm text-[rgb(var(--color-text-tertiary))] font-medium mb-3 tracking-wide uppercase">
          Скоро новое поступление
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between bg-[rgb(var(--color-bg-tertiary))] rounded-3xl p-8 md:p-12">
          <div className="text-center md:text-left mb-8 md:mb-0 md:mr-12 flex-1">
            <p className="text-base text-[rgb(var(--color-primary))] font-medium mb-3">
              Бестселлер 2024 года
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold text-[rgb(var(--color-text-base))] mb-8 leading-tight tracking-tight">
              LENOVO R2D2
              <br />с NVIDIA RTX 5090 TI
            </h1>
            <Button
              variant="primary"
              size="lg"
              onClick={() => (window.location.href = '/data/all')}
            >
              Узнать больше
            </Button>
          </div>
          <div className="flex-1">
            <img
              src={BG}
              alt="LENOVO R2D2 с NVIDIA RTX 5090 TI"
              className="w-full max-w-lg mx-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Poster;

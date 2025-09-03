<template>
  <div class="accordion-container" :key="route.path" v-if="hasAccordions">
    <div
        v-for="(accordion, index) in filteredAccordions"
        :key="accordion.id"
        class="accordion-tc"
    >
      <div class="container">
        <div class="accordion-header" @click="toggleAccordion(index)">
          <h4>{{ accordion.title }}</h4>
          <span class="accordion-icon">{{ isOpen[getRealIndex(index)] ? "−" : "+" }}</span>
        </div>
        <div
            :ref="el => accordionRefs[getRealIndex(index)] = el"
            class="accordion-body-wrapper"
            :style="getAccordionStyles(index)"
        >
          <div class="accordion-body">
            <div v-html="accordion.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer">
    <div class="footer__links">
      <div class="container">
        <div class="footer__links-row">
          <div
            v-for="(column, idx) in footerLinks"
            :key="idx"
            class="footer__links-column"
          >
            <h4>{{ column.title }}</h4>
            <ul>
              <li v-for="(link, index) in column.links" :key="index">
                <a
                  :href="link.url"
                  :title="link.title"
                  :target="link.target || '_self'"
                >
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__links-row">
          <div class="footer__links-column">
            <a
              target="_blank"
              href="https://jira.tecnologiafm.org/servicedesk/customer/portal/6"
              title="Libro de reclamaciones"
            >
              <img
                src="https://confianza.pe/img/2021/06/icono-libro-de-reclamaciones.png"
                width="200"
                alt="Libro de reclamaciones"
              />
            </a>
          </div>
          <div class="footer__links-column">
            <a
              target="_blank"
              href="/confianza/no-seas-victima-de-estafas"
              title="No seas víctima de estafas"
            >
              <img
                src="https://confianza.pe/img/2021/06/icono-no-seas-victima-de-estafas.png"
                width="170"
                alt="No seas víctima de estafas"
              />
            </a>
          </div>
          <div class="footer__links-column"></div>
          <div class="footer__links-column">
            <a
              href="https://www.fundacionmicrofinanzasbbva.org/"
              target="_blank"
              title="Fundación BBVA Microfinanzas"
            >
              <img
                src="https://confianza.pe/img/2021/05/logo-fmbbva.png"
                width="250"
                alt="Fundación BBVA Microfinanzas"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__copyright">
      <div class="footer__copyright-row">
        <div class="container">
          <ul>
            <li><a href="https://confianza.pe" title="Inicio">Inicio</a></li>
            <li>
              <a
                href="https://confianza.pe/confianza/nuestra-financiera"
                title="Nuestra Financiera"
                >Nuestra Financiera</a
              >
            </li>
            <li>
              <a
                href="https://confianza.pe/confianza/aviso-legal"
                title="Aviso legal"
                >Aviso legal</a
              >
            </li>
            <li>
              <a
                href="https://confianza.pe/confianza/proteccion-de-datos-personales"
                title="Protección de Datos Personales"
                >Protección de Datos Personales</a
              >
            </li>
            <li>
              <a
                href="https://confianza.pe/confianza/preguntas-frecuentes"
                title="Preguntas Frecuentes"
                >Preguntas Frecuentes</a
              >
            </li>
            <li>
              <a
                href="https://comunidad.bcf.pvt/comunidadvirtual/index.php"
                target="_blank"
                title="Comunidad Virtual"
                >Comunidad Virtual</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__copyright-row">
        <p>
          Copyright:
          <a
            href="https://syscontrollers.com"
            target="_blank"
            title="Syscontrollers"
            >Syscontrollers</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  {
    title: "Financiera Confianza",
    links: [
      {
        title: "Nuestra Financiera",
        url: "https://confianza.pe/confianza/nuestra-financiera",
      },
      {
        title: "Transparencia",
        url: "https://confianza.pe/confianza/transparencia",
      },
      {
        title: "Canales de atención",
        url: "https://confianza.pe/confianza/red-de-agencias",
      },
      {
        title: "Trabaja con nosotros",
        url: "https://financiera-confianza.sherlockhr.com/ofertas/",
        target: "_blank",
      },
      {
        title: "Información para accionistas minoritarios",
        url: "https://confianza.pe/confianza/accionistas-minoritarios",
      },
      {
        title: "Coronavirus: Protocolo de atención",
        url: "https://confianza.pe/confianza/docs/Protocolo-de-Atencion-en-Agencias.pdf",
        target: "_blank",
      },
      {
        title: "Glosario Financiero",
        url: "https://confianza.pe/confianza/glosario-financiero",
      },
      {
        title: "Contáctanos",
        url: "https://confianza.pe/confianza/contactanos",
      },
    ],
  },
  {
    title: "¿Qué necesitas?",
    links: [
      {
        title: "Empezar o mejorar tu negocio",
        url: "https://confianza.pe/confianza/creditos",
      },
      {
        title: "Mejorar tu cosecha o ganado",
        url: "https://confianza.pe/negocios/agricola/credito-agropecuario",
      },
      {
        title: "Construir tu local o vivienda",
        url: "https://confianza.pe/negocios/inmueble-productivo/construyendo-confianza",
      },
      {
        title: "Ahorrar para cumplir tus sueños",
        url: "https://confianza.pe/confianza/ahorros",
      },
      {
        title: "Bloquear tu tarjeta por pérdida o robo",
        url: "https://confianza.pe/confianza/bloquear-tarjeta-perdida-robo",
      },
      {
        title: "Bloquear canales digitales por pérdida o robo",
        url: "https://confianza.pe/confianza/bloquear-canales-digitales",
      },
    ],
  },
  {
    title: "Seguros",
    links: [
      {
        title: "Desgravamen",
        url: "https://confianza.pe/negocios/seguros/desgravamen",
      },
      {
        title: "Desgravamen con Devolución",
        url: "https://confianza.pe/negocios/seguros/desgravamen-con-devolucion",
      },
      {
        title: "Desgravamen para PDM",
        url: "https://confianza.pe/negocios/seguros/desgravamen-pdm",
      },
      {
        title: "Multiriesgo PYME",
        url: "https://confianza.pe/negocios/seguros/multiriesgo",
      },
      {
        title: "Vida Segura",
        url: "https://confianza.pe/persona/seguros/vida-segura",
      },
      {
        title: "Protección de cuota",
        url: "https://confianza.pe/persona/seguros/proteccion-de-cuotas",
      },
      {
        title: "Agrícola Cofinanciado",
        url: "https://confianza.pe/negocios/seguros/agricola-rendimiento",
      },
    ],
  },
  {
    title: "Enlaces de Interés",
    links: [
      {
        title: "Fundación Microfinanzas BBVA",
        url: "https://www.fundacionmicrofinanzasbbva.org/",
        target: "_blank",
      },
      {
        title: "Revista jurídica Progreso",
        url: "https://progresomicrofinanzas.org/",
        target: "_blank",
      },
      {
        title: "Protección de Datos Personales",
        url: "https://confianza.pe/confianza/politica-de-privacidad",
      },
      {
        title: "Listado de Notarios",
        url: "https://confianza.pe/confianza/listado-de-notarios",
      },
      {
        title: "SMV - Información general",
        url: "https://www.gob.pe/smv",
        target: "_blank",
      },
      {
        title: "SBS",
        url: "https://www.sbs.gob.pe/usuarios/",
        target: "_blank",
      },
    ],
  },
];

import { ref, watch, onMounted, nextTick, computed } from "vue";
import { useRoute } from "vue-router";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  routes: string[];
}

const accordions = ref<AccordionItem[]>([
  {
    id: 'credito-agropecuario',
    title: 'Producto Crédito Agropecuario y Emprendiendo Confianza Pyme',
    routes: ['/prestamo'],
    content: `
      <p>
        <img src="https://confianza.pe/img/2025/06/tc-franja_myde-pc.png" alt="MYDE" class="tc-version-pc"/>
        <img src="https://confianza.pe/img/2025/06/tc-franja_myde-movil.png" alt="MYDE" class="tc-version-movil"/>
      </p>
    `
  },
  {
    id: 'tc-ahorro',
    title: 'Producto Ahorro Confianza',
    routes: ['/ahorros'],
    content: `
      <p>
        <img src="https://confianza.pe/img/2025/08/tc-ahorro.png" alt="Ahorro" class="tc-version-pc"/>
        <img src="https://confianza.pe/img/2025/08/tc-ahorro.png" alt="Ahorro" class="tc-version-movil"/>
      </p>
    `
  },
  {
    id: 'tc-dpf',
    title: 'Producto Depósito a Plazo Fijo',
    routes: ['/dpf'],
    content: `
      <p>
        <img src="https://confianza.pe/img/2025/08/tc-dpf-2.png" alt="DPF" class="tc-version-pc"/>
        <img src="https://confianza.pe/img/2025/08/tc-dpf-2.png" alt="DPF" class="tc-version-movil"/>
      </p>
`
  }
]);

const isOpen = ref<boolean[]>(new Array(accordions.value.length).fill(false));
const accordionRefs = ref<HTMLElement[]>(new Array(accordions.value.length).fill(null));
const route = useRoute();

const filteredAccordions = computed(() =>
    accordions.value.filter(accordion => accordion.routes.includes(route.path))
);

const hasAccordions = computed(() => filteredAccordions.value.length > 0);

const getAccordionStyles = (index: number) => {
  const realIndex = getRealIndex(index);
  return {
    maxHeight: realIndex >= 0 && isOpen.value[realIndex]
        ? (accordionRefs.value[realIndex]?.scrollHeight + 'px')
        : '0px',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease',
  };
};

const toggleAccordion = async (index: number) => {
  const realIndex = getRealIndex(index);

  if (realIndex < 0) return;

  isOpen.value[realIndex] = !isOpen.value[realIndex];

  await nextTick();

  const el = accordionRefs.value[realIndex];
  if (!el) return;

  if (isOpen.value[realIndex]) {
    el.style.maxHeight = el.scrollHeight + 'px';
  } else {
    el.style.maxHeight = '0px';
  }
};

const getRealIndex = (filteredIndex: number) => {
  const accordion = filteredAccordions.value[filteredIndex];
  return accordion ? accordions.value.findIndex(acc => acc.id === accordion.id) : -1;
};

const addAccordion = (accordion: AccordionItem) => {
  accordions.value.push(accordion);
  isOpen.value.push(false);
  accordionRefs.value.push(null);
};

const removeAccordion = (index: number) => {
  accordions.value.splice(index, 1);
  isOpen.value.splice(index, 1);
  accordionRefs.value.splice(index, 1);
};

watch(() => route.path, () => isOpen.value.fill(false), { immediate: true });

defineExpose({
  addAccordion,
  removeAccordion,
  accordions,
  toggleAccordion
});
</script>

<style scoped>
.accordion-container {
  width: 100%;
  margin-top: 1rem;
}

.accordion-tc {
  background-color: #ffffff;
  border: 1px solid #cce0f0;
  padding: 1.5rem 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  border-left: 0;
  border-right: 0;
}

.accordion-tc:first-child {
  margin-top: 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.accordion-header h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #004481;
  line-height: 150%;
}

.accordion-icon {
  background-color: #004481;
  color: #fff;
  border-radius: 50%;
  font-size: 1.2rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.accordion-header:hover .accordion-icon {
  background-color: #002c61;
}

.accordion-body-wrapper {
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.accordion-body {
  font-size: 0.95rem;
  color: #333;
  padding: 1rem 0;
}

/* Estilos para el contenido HTML */
.accordion-body :deep(img) {
  width: 100%;
}

.accordion-body :deep(.tc-version-pc) {
  display: block;
}

.accordion-body :deep(.tc-version-movil) {
  display: none;
}

.accordion-body {
  margin-top: 1rem;
}

.accordion-body :deep(h5) {
  color: #004481;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.accordion-body :deep(ul) {
  padding-left: 1.2rem;
  margin-top: 0.5rem;
}

.accordion-body :deep(li) {
  margin-bottom: 0.3rem;
  color: #555;
}

@media screen and (max-width: 768px) {
  .accordion-body :deep(.tc-version-pc) {
    display: none;
  }

  .accordion-body :deep(.tc-version-movil) {
    display: block;
  }
}

@media screen and (max-width: 576px) {
  .accordion-header {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }

  .accordion-icon {
    width: 24px;
    height: 24px;
    font-size: 1rem;
    margin-top: 2px;
  }

  .accordion-header h4 {
    font-size: 1rem;
  }
}
</style>

import { Component, HostListener, SimpleChanges, ElementRef } from '@angular/core';
import { Girl, EditLevel, Service } from '../types';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { formatPrice } from '../helper-functions';
import { InternalService } from '../internal.service';
import { MainService } from '../main.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WeekScheduleComponent } from '../week-schedule/week-schedule.component';
import { Title, Meta } from '@angular/platform-browser';

import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-girl-page',
  standalone: true,
  imports: [WeekScheduleComponent, ButtonModule, GalleriaModule, ChipModule, TooltipModule, DividerModule, DialogModule],
  templateUrl: './girl-page.component.html',
  styleUrl: './girl-page.component.scss',
})
export class GirlPageComponent {
  allGirls: Girl[] = [];
  girl: Girl | any;

  priceDialogVisible: boolean = false;
  scheduleDialogVisible: boolean = false;

  noDisplayValue = environment.noDisplayValue;
  totalImages: number = 1;
  activeGirlImages: string[] = [];
  activeGaleriaImages: string[] = [];
  visibleUploadDialog: boolean = false;
  displayCustom: boolean = false;
  activeIndex: number = 0;
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  phoneView: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private internalService: InternalService,
    private mainService: MainService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.internalService.allGirlsData.subscribe((data) => {
      if (data) {
        this.allGirls = data;
      }
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        // It's a phone
        this.phoneView = true;
      } else {
        // It's not a phone
        this.phoneView = false;
      }
    });
  }

  callGirl(girl: Girl) {
    window.location.href = `tel:${girl.phoneNumber}`;
  }

  whatsappGirl(girl: Girl) {
    const phoneNumber = girl.phoneNumber;
    const message = `Hola ${girl.name}, he visto tu perfil en Verificadas.cl y me gustaria saber mas de ti!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  showPriceDialog() {
    this.priceDialogVisible = true;
  }

  showScheduleDialog() {
    this.scheduleDialogVisible = true;
  }

  getTextForEditLevel(girl: Girl) {
    let editLevelMessage: string = '';
    if (girl.editLevel === EditLevel.NONE) {
      editLevelMessage = `las fotos de ${girl.name} tienen poco, o nada de retoque`;
    } else if (girl.editLevel === EditLevel.MID) {
      editLevelMessage = `las fotos de ${girl.name} tienen un nivel bajo de retoque`;
    } else if (girl.editLevel === EditLevel.FULL) {
      editLevelMessage = `las fotos de ${girl.name} estan retocadas`;
    }
    return editLevelMessage;
  }

  formatPrice(numberPrice: Number) {
    return formatPrice(numberPrice);
  }

  formatButtonPrice(price: Number) {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedPrice;
  }

  getVerificationTooltip() {
    return `${this.girl.name} fue Verificada en persona \n\n Edad, Peso, altura, y medidas fueron comprobadas`;
  }

  checkIfServiceIsPaid(serviceId: Number) {
    if (this.girl.paidServices.length === 0) {
      return false;
    } else {
      return this.girl.paidServices.some((service: Service) => service.id === serviceId);
    }
  }

  getAgeFromBday(bday: Date | string) {
    const bdayDate = new Date(bday);
    var today = new Date();
    var age = today.getFullYear() - bdayDate.getFullYear();
    var monthDiff = today.getMonth() - bdayDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bdayDate.getDate())) {
      age--;
    }

    return age;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isClickedInsideAllowedElements(event.target)) {
      this.displayCustom = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscKeydown(event: KeyboardEvent) {
    this.displayCustom = false;
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onLeftArrowKeydown(event: KeyboardEvent) {
    this.activeIndex = (this.activeIndex - 1 + this.totalImages) % this.totalImages;
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  onRightArrowKeydown(event: KeyboardEvent) {
    this.activeIndex = (this.activeIndex + 1) % this.totalImages;
  }

  isClickedInsideAllowedElements(target: any): boolean {
    if (target.closest('#customImageDisplay') !== null) {
      return true;
    }
    if (this.isButtonOrAncestor(target)) {
      return true;
    }
    const gridElementActive = this.elementRef.nativeElement.querySelector('#imageGridActive');
    if (gridElementActive && gridElementActive.contains(target)) {
      return true;
    }
    return false;
  }

  isButtonOrAncestor(element: any): boolean {
    // Traverse up the DOM tree from the clicked element
    while (element) {
      if (element.tagName && element.tagName.toLowerCase() === 'button') {
        return true; // If a button element is found, return true
      }
      element = element.parentNode; // Move to the parent node
    }
    return false; // If no button element is found, return false
  }

  openImage(index: number) {
    this.activeGaleriaImages = this.activeGirlImages;
    this.totalImages = this.activeGirlImages.length;
    this.activeIndex = index;
    this.displayCustom = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['girl']) {
      if (this.girl !== undefined) {
        if (this.girl.bluredFace) {
          this.activeGirlImages = this.girl.images.bluredFace;
        } else {
          this.activeGirlImages = this.girl.images.active;
        }
      }
    }
  }

  async girlInit() {
    try {
      window.scrollTo(0, 0);
      const params = await firstValueFrom(this.route.params);
      if (params) {
        let girlId = parseInt(params['id']);
        if (girlId) {
          if (this.allGirls.length <= 1) {
            await this.mainService.initiateEverythingGirlPage(girlId);
          }
          this.girl = this.allGirls.find((girl) => girl.id === girlId);
          if (this.girl !== undefined) {
            if (this.girl.bluredFace) {
              this.activeGirlImages = this.girl.images.bluredFace;
            } else {
              this.activeGirlImages = this.girl.images.active;
            }
          }
        } else {
        }
      }
    } catch (error) {
      console.error('Error with getting girl logic', error);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.girlInit();
    if (this.girl !== undefined) {
      this.titleService.setTitle(`Escort Verificada ${this.girl.name}`);
      this.metaService.updateTag({
        name: 'description',
        content: `${this.girl.description}`,
      });
    } else {
      this.router.navigate(['/escorts']);
    }
  }
}

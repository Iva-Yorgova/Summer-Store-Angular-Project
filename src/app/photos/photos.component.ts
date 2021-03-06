import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';

export interface Photo {
  id: number,
  width: number,
  height: number,
  url: string,
  photographer: string,
  photographer_url: string,
  photographer_id: number,
  avg_color: string,
  src: {
    original: string,
    large2x: string,
    large: string,
    medium: string,
    small: string,
    portrait: string,
    landscape: string,
    tiny: string
  },
  liked: boolean,
  alt: string
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  config: any;

  public photos: Array<Photo> | any;

  search!: string;
  perPage!: number;
  data!: Photo[];
  gallery!: Photo[];

  startIndex = 0;
  endIndex = 10;

  constructor(private httpClient: HttpClient, private photoService: PhotosService) 
  {
    this.photoService.getData(this.search, this.perPage)
  }

  ngOnInit(): void {
    this.getGallery();
  }

  searchPhotos() {
    this.photoService.getData(this.search, this.perPage).subscribe((data) => {
      console.log(data);
      this.data = data.photos;
  }, (error) => console.log(error));
  }

  getGallery() {
    this.photoService.getGalleryData().subscribe((gallery) => {
      this.gallery = gallery.photos;
  }, (error) => console.log(error));
  }

  getArrayFromNumber(length: any) {
    return new Array(length/10);
  }
 
  updateIndex(pageIndex: any) {
    this.startIndex = pageIndex * 10;
    this.endIndex = this.startIndex + 10;
  }

}

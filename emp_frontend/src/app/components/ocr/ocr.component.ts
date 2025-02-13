import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-ocr',
  imports: [CommonModule],
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css'],
})
export class OCRComponent {
  @Output() ocrResult = new EventEmitter<string>();

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Reference to the file input

  isProcessing: boolean = false;
  isUsingCamera: boolean = false;
  mediaStream: MediaStream | null = null;

  // Handle file upload
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.processImageFromFile(file);
    }
  }

  // Process image using Tesseract.js
  processImageFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result as string;
      this.processImageFromDataURL(imageDataUrl);
    };
    reader.readAsDataURL(file);
  }

  processImageFromDataURL(imageDataUrl: string) {
    this.isProcessing = true;
    Tesseract.recognize(imageDataUrl, 'eng', {
      logger: (info) => {
        console.log(info);
        switch (info.status) {
          case 'recognizing text':
            console.log(`Progress: ${(info.progress * 100).toFixed(2)}%`);
            break;
          case 'loading language traineddata':
            console.log(`Loading language data: ${(info.progress * 100).toFixed(2)}%`);
            break;
          case 'initializing api':
            console.log('Initializing Tesseract API');
            break;
          case 'initializing tesseract':
            console.log('Initializing Tesseract');
            break;
          case 'loading tesseract core':
            console.log('Loading Tesseract core');
            break;
        }
      },
    })
      .then(({ data: { text } }) => {

        console.log('Processed Text from Tesseract:', text);
        
        this.ocrResult.emit(text); // Emit the extracted text
        this.isProcessing = false;

        // Reset the file input after processing is done
        this.resetFileInput();
      })
      .catch((error) => {
        console.error('OCR Error:', error);
        this.isProcessing = false;

        // Reset the file input even if an error occurs
        this.resetFileInput();
      });
  }

  // Reset the file input value
  resetFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Clear the input value
    }
  }

  // Open the camera
  openCamera() {
    this.isUsingCamera = true;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.mediaStream = stream;
      const video = this.videoElement.nativeElement;
      video.srcObject = stream;
      video.play();
    });
  }

  // Close the camera
  closeCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.isUsingCamera = false;
  }

  // Capture an image from the camera
  captureImage() {
    if (this.mediaStream) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      const context = canvas.getContext('2d')!;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');

      this.closeCamera();
      this.processImageFromDataURL(imageDataUrl);
    }
  }
}

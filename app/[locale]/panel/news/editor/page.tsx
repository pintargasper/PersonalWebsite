"use client";

import React, { useState } from 'react';
import ImageUploadArea from './ImageUploadArea';
import RichTextEditor from './RichTextEditor';

const NewsEditorPage = () => {

    const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');

  const handlePreview = () => {
    const encoded = encodeURIComponent(content);
    window.open(`/panel/news/editor/preview?html=${encoded}`, '_blank');
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row gx-1 align-items-start" style={{margin: 0, padding: 0, height: '100%'}}>
          <div className="col-lg-2" style={{margin: 0, padding: 0, height: '100%'}}>
              <ImageUploadArea images={images} onImagesChange={setImages} />
          </div>
          <div className="col-lg-8 d-flex flex-column" style={{margin: 0, padding: 0, height: '100%'}}>
              <div className="flex-grow-1">
                  <RichTextEditor content={content} onContentChange={setContent} images={images} />
              </div>
          </div>
          <div className={"col-lg-2 p-2"}>
              <form>
                  <div className="mb-2">
                      <label htmlFor="news-title" className="form-label">Ime novice</label>
                      <input id="news-title" name="title" type="text" className="form-control" placeholder="Vnesi ime novice" />
                  </div>
                  <div className="mb-2">
                      <label htmlFor="news-description" className="form-label">Kratek opis novice</label>
                      <textarea id="news-description" name="description" className="form-control" placeholder="Vnesi kratek opis novice" />
                  </div>
                  <button type="button" className="button button-primary w-100 mb-1" onClick={handlePreview}>Predogled novice</button>
                  <button type="submit" className="button button-primary w-100">Objavi novico</button>
              </form>
          </div>
      </div>
    </div>
  );
};

export default NewsEditorPage;

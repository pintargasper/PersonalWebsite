"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

const Preview = () => {
  const searchParams = useSearchParams();
  const html = searchParams.get('html') || '';

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="p-4 bg-white rounded shadow border" style={{ minHeight: '700px', maxHeight: '900px', overflowY: 'auto' }}>
            <h2 className="mb-4 text-center">Predogled novice</h2>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

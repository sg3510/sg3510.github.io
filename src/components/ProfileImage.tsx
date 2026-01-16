import { useState } from 'react';

const imageList = [
  'seb_hiking.jpg',
  'seb_android.jpg',
  'seb_hiking_matterhorn.jpg',
  'seb_zermatt_2x.jpg',
  'seb_limmat_2x.jpg',
  'seb_hiking_ch_2x.jpg',
];

const getRandomImage = (current: string) => {
  let filtered = imageList.filter((img) => img !== current);
  if (filtered.length === 0) filtered = imageList;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export default function ProfileImage() {
  const [profileImg, setProfileImg] = useState<string>('seb_hiking.jpg');

  const getImgSrc = (img: string) => `/images/${img}`;

  const getImgSrcSet = (img: string) => {
    if (img.endsWith('_2x.jpg')) {
      return `/images/${img} 2x, /images/${img} 1x`;
    }
    const base = img.replace(/\.jpg$/, '');
    if (imageList.includes(`${base}_2x.jpg`)) {
      return `/images/${img} 1x, /images/${base}_2x.jpg 2x`;
    }
    return undefined;
  };

  const handleImgClick = () => {
    setProfileImg((curr) => getRandomImage(curr));
  };

  return (
    <div className="profile-img-container">
      <img
        src={getImgSrc(profileImg)}
        srcSet={getImgSrcSet(profileImg)}
        alt="Seb hiking"
        className="profile-img"
        width={256}
        height={256}
        style={{ objectFit: 'cover' }}
        onClick={handleImgClick}
      />
    </div>
  );
}

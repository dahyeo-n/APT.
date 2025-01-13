'use client';

import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { gsap } from 'gsap';

// TODO: 손처럼 보이게 만들기
// TODO: 사람 수 (participants.length) 만큼의 손의 색을 생성 (이 색으로 누구의 손인지 구분)
// TODO: 사람 수만큼 다양한 방면에서 쌓이게 (여러 명이 둘러앉은 것처럼! 같은 방면에서 다른 사람(다른 색)의 손이 올라올 순 없음)
// TODO: 화면의 맨 아래부터 시작해서 맨 위까지 올라간 뒤, 맨 위에 손이 올라갔는데도 층수가 남았으면
// 올렸던 손이 전체적으로 화면 밑으로 안 보이게 내려가게 하기 (맨 위에 올렸던 손 2개만 제외하고)
// TODO: 손 올라갈 때, 같은 색상으로 이름도 표시되게
// TODO: 라이트/다크 테마에 맞춰서 배경색 변경

const ApateuGamePlayAnimation = ({ gameData }: { gameData: any }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  console.log('게임 데이터: ', gameData);

  // 참가자별 색상 생성
  const generateColors = (numParticipants: number) => {
    return Array.from(
      { length: numParticipants },
      (_, i) => `hsl(${(i / numParticipants) * 360}, 100%, 50%)`
    );
  };

  const createHand = (color: string): THREE.Group => {
    const handGroup = new THREE.Group();

    // 손바닥 부분 (박스)
    const palmGeometry = new THREE.BoxGeometry(5, 0.5, 3);
    const palmMaterial = new THREE.MeshStandardMaterial({ color });
    const palmMesh = new THREE.Mesh(palmGeometry, palmMaterial);
    palmMesh.position.set(0, 0.25, 0); // 중심 위치 조정

    // 손목 부분 (원기둥)
    const wristGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const wristMaterial = new THREE.MeshStandardMaterial({ color });
    const wristMesh = new THREE.Mesh(wristGeometry, wristMaterial);
    wristMesh.position.set(0, -1.25, 0); // 손목 위치 조정

    handGroup.add(palmMesh);
    handGroup.add(wristMesh);

    return handGroup;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // 기존 PointLight 조명
    const light = new THREE.PointLight(0xffffff, 2); // 강도를 2로 설정
    light.position.set(10, 20, 10);
    scene.add(light);

    // AmbientLight 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 전체적으로 밝게
    scene.add(ambientLight);

    // 참가자 색상 배열 생성
    const colors = generateColors(gameData.participants.length);

    // 손이 올라오는 방향 관리 (-x, +x, -z, +z)
    const directions = ['left', 'right', 'front', 'back'];
    const usedDirections = new Set<string>();

    // 손 애니메이션 생성
    const hands: THREE.Group[] = [];
    for (let i = 0; i < gameData.number_of_aparteu_floors; i++) {
      const participantIndex = i % gameData.participants.length;
      const color = colors[participantIndex];
      const hand = createHand(color);

      // 랜덤 방향 설정
      let direction;
      do {
        direction = directions[Math.floor(Math.random() * directions.length)];
      } while (usedDirections.has(direction)); // 같은 방향에서 같은 사람이 올라오지 않도록 방지
      usedDirections.add(direction);

      // 손 위치 및 회전 설정
      switch (direction) {
        case 'left':
          hand.position.set(-6 - i * 2, 0, 0); // 수평 이동 (-x 방향)
          hand.rotation.z = Math.PI / 2; // 손을 왼쪽으로 회전
          break;
        case 'right':
          hand.position.set(6 + i * 2, 0, 0); // 수평 이동 (+x 방향)
          hand.rotation.z = -Math.PI / 2; // 손을 오른쪽으로 회전
          break;
        case 'front':
          hand.position.set(0, 0, 6 + i * 2); // 수평 이동 (+z 방향)
          hand.rotation.x = Math.PI / 2; // 손을 앞으로 회전
          break;
        case 'back':
          hand.position.set(0, 0, -6 - i * 2); // 수평 이동 (-z 방향)
          hand.rotation.x = -Math.PI / 2; // 손을 뒤로 회전
          break;
      }

      hands.push(hand);
      scene.add(hand);

      // 애니메이션: 층마다 손 쌓기
      gsap.to(hand.position, {
        y: i * 1.5, // 손등 위로 차곡차곡 쌓이게 설정
        duration: 1,
        delay: i * 0.5,
        onComplete: () => {
          if (i === gameData.number_of_aparteu_floors - 1) {
            // 마지막 층 이후, 맨 위 두 개를 제외하고 나머지를 아래로 이동
            hands.forEach((h, index) => {
              if (index < hands.length - 2) {
                gsap.to(h.position, {
                  y: -20, // 화면 아래로 이동
                  duration: 1,
                  delay: 0.5,
                });
              }
            });
          }
        },
      });
    }

    // 카메라 설정
    camera.position.set(0, 10, 30);
    camera.lookAt(0, 5, 0);

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [gameData]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '500px', background: 'black' }}
      className='relative rounded-lg overflow-hidden shadow-lg'
    />
  );
};

export default ApateuGamePlayAnimation;

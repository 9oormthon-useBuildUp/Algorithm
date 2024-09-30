class Deque {
  constructor() {
    // 객체를 이용해 deque의 데이터를 저장할 storage, head, tail 초기화
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }

  push_back(value) {
    // tail 위치에 값을 추가하고 tail을 증가시킴
    this.storage[this.tail] = value;
    this.tail++;
  }

  pop_front() {
    // 비어있으면 -1 반환
    if(this.empty()) return -1;

    // head 위치의 값을 제거하고 head를 증가시킴
    const temp = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;

    return temp;
  }

  pop_back() {
    // 비어있으면 -1 반환
    if(this.empty()) return -1;
    // tail을 감소시키고 tail 위치의 값을 제거
    const temp = this.storage[--this.tail];
    delete this.storage[this.tail];

    return temp;
  }

  size() {
    // deque의 현재 크기 반환
    return this.tail - this.head;
  }

  empty() {
    // deque가 비어있는지 확인
    return this.size() ? 0 : 1;
  }

  front() {
    return this.empty() ? -1 : this.storage[this.head];
  }
  
  back() {
    return this.empty() ? -1 : this.storage[this.tail - 1];
  }
}


const solution = (N, L, A) => {

  // Deque 인스턴스를 생성하고 결과를 저장할 배열을 초기화
  const dq = new Deque();
  const answer = new Array(N);


  for (let i = 0; i < N; i++) {
    // 슬라이딩 윈도우 범위를 벗어난 인덱스를 제거
    if(!dq.empty() && dq.front() < i - L + 1){
      dq.pop_front();
    }
    
    // 오름차순으로 정렬해 최솟값 읽어올 수 있도록 인덱스 저장
    while(!dq.empty() &&A[dq.back()] > A[i]){
      dq.pop_back();
    }
    
    // 현재 인덱스를 deque에 추가
    dq.push_back(i);
    
    // 현재 deque의 최솟값을 결과에 저장
    answer[i] = A[dq.front()];
    
  }

  process.stdout.write(answer.join(' '));
};

// 입력을 받아와서 N, L, A 배열을 초기화
const input = require('fs').readFileSync(0).toString().trim().split('\n');
const [[N, L], A] = input.map((value) => value.split(' ').map(Number));

// solution 함수 호출
solution(N, L, A);

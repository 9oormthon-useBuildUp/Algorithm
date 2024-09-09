class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def build_tree_from_string(s):
    if not s:
        return None

    # 첫 번째 문자로 노드를 만듬
    root = TreeNode(s[0])
    
    # 나머지 문자열로부터 왼쪽, 오른쪽 자식을 만듬
    if len(s) > 1:
        mid = len(s) // 2
        root.left = build_tree_from_string(s[1:mid+1])
        root.right = build_tree_from_string(s[mid+1:])
    
    return root

def print_tree(root, level=0, label='.'):
    # 트리를 출력하는 함수 (깊이 우선 탐색)
    if root is not None:
        print(' ' * (level*4) + label + ':', root.value)
        print_tree(root.left, level + 1, 'L')
        print_tree(root.right, level + 1, 'R')

def main():
    # N을 입력받음
    N = int(input("Enter the number of strings: "))
    
    trees = []
    for _ in range(N):
        # 각 문자열 입력받음
        s = input("Enter a string: ")
        # 문자열을 이진 트리로 변환
        tree = build_tree_from_string(s)
        trees.append(tree)
    
    # 각 트리를 출력
    for i, tree in enumerate(trees):
        print(f"\nTree {i+1}:")
        print_tree(tree)

if __name__ == "__main__":
    main()

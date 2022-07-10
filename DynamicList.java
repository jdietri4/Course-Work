
import java.util.Scanner;

public class DynamicList<Type> {
	
	private Object[] array;
	int listSize;

	public DynamicList() {
		array = new Object[10];
		listSize = 0;
	}

	public DynamicList(int cap) {
		array = new Object[cap];
		listSize = 0;
	}

	public void add(Type item) {
		array[listSize] = item;
		listSize++;
	}

	public Type get(int index) throws IndexOutOfBoundsException {
		if(index >= listSize) {
			throw new IndexOutOfBoundsException();
		}
		@SuppressWarnings("unchecked")
		Type value = (Type) array[index];
		return value;
	}

	public int size() {
		return listSize;
	}
	
	public void clear() {
		listSize = 0;
	}
}
